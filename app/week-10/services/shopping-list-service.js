import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc } from "firebase/firestore";

export async function getItems(userId) {
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);
    const snapshot = await getDocs(q);
    const items = [];
    snapshot.forEach((docSnap) => {
        items.push({
            id: docSnap.id,
            ...docSnap.data(),
        });
    });
    return items;
}

export async function addItem(userId, item) {
    const itemsRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
}

export async function deleteItem(userId, itemId) {
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
}