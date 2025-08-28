export interface INoteType { 
    _id: string;
    title: string;
    content: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string   
}

export interface IGetAllNoteSlice {
    data: INoteType[] | null;
    error: string | null;
    loading: boolean;
    isEdit: boolean;
    editId: string;
}

export interface INoteRequetTypePost {
    title?: string;
    content?: string;
    id?: string;        
}