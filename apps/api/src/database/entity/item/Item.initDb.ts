import { InitDb } from '../../InitDb';
import { ItemRef } from './ref/ItemRef.entity';
import { ItemSlots } from './ref/ItemSlots.entity';
import { historyInitDb } from './history/history.initDb';

export const itemInitDb = new InitDb([
    ItemRef,
    ItemSlots,
    ...historyInitDb.getEntities(),
]);
