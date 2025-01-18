export const TEU_TYPES = {
    "Standard (Tonne)": 1,
    "TEU (Lightweight Cargo)": 6,
    "TEU (Average Cargo)": 10,
    "TEU (Heavyweight Cargo)": 14.5,
    "TEU (Empty Container)": 2,
}
export type TEU_TYPE = keyof typeof TEU_TYPES;