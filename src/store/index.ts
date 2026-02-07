import { createStore, createEvent } from "effector";

export const $ActiveModal = createStore<string>("guide_first");

export const setActiveModal = createEvent<string>("");

$ActiveModal.on(setActiveModal, (_, state) => state);