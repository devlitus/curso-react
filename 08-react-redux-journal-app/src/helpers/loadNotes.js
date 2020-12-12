import { db } from "../firebase/firebaseConfig"

export const loadNotes = async (id) => {
    const noteSnapshot = await db.collection(`${id}/journal/notes`).get();
    const note = [];
    noteSnapshot.forEach(snapChild => {
        note.push({
            id: snapChild.id,
            ...snapChild.data()
        });
    });
    return note;
}