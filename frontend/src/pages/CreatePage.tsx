
import { useSelector } from "react-redux";
import { NoteForm } from "../components/NoteForm";
import type { RootState } from "../store/store";

export default function CreatePage() {
    const isEditMode = useSelector((state: RootState) => state.notes.isEdit);
    const editId = useSelector((state: RootState) => state.notes.editId);
    return (
        <NoteForm isEditMode={isEditMode} editId={editId}/>
    );
}