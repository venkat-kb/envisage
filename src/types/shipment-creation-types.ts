export type CreationState = {
    state: "default";
} | {
    state: "editing";
    id: string;
} | {
    state: "recreating";
    id: string;
};

export const shipmentCreateButtonText = (state: CreationState) => {
    switch (state.state) {
        case "default":
            return "Create";
        case "editing":
            return "Update";
        case "recreating":
            return "Recreate";
    }
}

export const shipmentCreateLabel = (state: CreationState) => {
    switch (state.state) {
        case "default":
            return "New shipment";
        case "editing":
            return "Edit shipment";
        case "recreating":
            return "Recreate shipment";
    }
}