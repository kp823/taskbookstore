import { atom } from "recoil";

export const bookManagementState = atom({
    key: "bookManagement",
    default: {
        id: null,
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        published: "",
        publisher: "",
        image: "",
    },
});
