import { ItemBuilder, ItemRoll } from '@api/io-model';
import { writeFile } from 'fs';
import Tesseract from 'tesseract.js';

export class ImageService {
    async convert(image: Express.Multer.File): Promise<ItemRoll> {
        const processedImage: Tesseract.RecognizeResult =
            await Tesseract.recognize(image.buffer, 'eng');
        const itemBuilder: ItemBuilder = new ItemBuilder();
        for (const line of processedImage.data.lines) {
            itemBuilder.matchLine(line);
        }
        itemBuilder.filterMatches();

        outputImage(processedImage);

        return undefined;
    }
}
function outputImage(processedImage: Tesseract.RecognizeResult) {
    const cloned = doClone(processedImage.data.lines, 9, ['tsv', 'hocr']);
    writeFile('out.json', JSON.stringify(cloned), () => console.log('done'));
    const cloned2 = doClone(processedImage, 9, ['tsv', 'hocr']);
    writeFile('entireFile.json', JSON.stringify(cloned2), () =>
        console.log('done')
    );
}

function doClone(val: unknown, depth: number, ignore: string[]): unknown {
    if (typeof val != 'object') {
        return val;
    }
    if (Array.isArray(val)) {
        if (depth == 0) return '[...]';
        const cloned = [];
        for (const innerVal of val) {
            cloned.push(doClone(innerVal, depth - 1, [...ignore]));
        }
        return cloned;
    } else {
        if (depth == 0) return '{...}';
        const cloned = {};
        for (const innerVal in val) {
            if (ignore.includes(innerVal)) continue;
            cloned[innerVal] = doClone(val[innerVal], depth - 1, [
                ...ignore,
                innerVal,
            ]);
        }
        return cloned;
    }
}
