export interface WallDoor {
    HEIGHT: number;
    WIDTH: number;
    AREA: number;
}

export interface WallWindow {
    HEIGHT: number;
    WIDTH: number;
    AREA: number;
}

export interface BussinessRulesConstants {
    MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS: number;
    MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS: number;
    SMALL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS: number;
    NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS: number;
    MEDIUM_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS: number;
    LARGE_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS: number;
    MINIMUM_HEIGHT_TO_HAVE_DOOR: number;
    MINIMUM_WIDTH_TO_HAVE_DOOR: number;
    MINIMUM_HEIGHT_TO_HAVE_WINDOW: number;
    MINIMUM_WIDTH_TO_HAVE_WINDOW: number;
}

export interface PaintCansToBuy {
    bigPaintCan: number;
    mediumPaintCan: number;
    normalPaintCan: number;
    smallPaintCan: number;
}

export interface RoomStatus {
    hasWallBusinessRulesErrors: [boolean, boolean, boolean, boolean];
    wallsFreeAreasToPaint: [number, number, number, number];
}

export interface BussinessRulesErrorsMessages {
    WALL_AREA_IS_LESS_THAN_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS: "Wall must has at least 1 m²";
    WALL_AREA_IS_GREATER_THAN_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS: "Wall should not has more than 50 m²";
    TOTAL_SUM_DOORS_AND_WINDOWS_AREA_IS_GREATER_THAN_FIFTY_PERCENT_OF_THE_WALL_AREA: "Total area of ​​doors and windows should not be greater than 50% of the total area of ​​the wall";
    WALL_HEIGHT_MUST_BE_GREATER_THAN_DOOR_HEIGHT: "Wall height must be greater than door 190 centimeters height";
    WALL_WIDTH_MUST_BE_GREATER_THAN_DOOR_WIDTH: "Wall width must be greater than door 80 centimeters width";
    WALL_HEIGHT_MUST_BE_GREATER_THAN_WINDOW_HEIGHT: "Wall height must be greater than window 200 centimeters height";
    WALL_WIDTH_MUST_BE_GREATER_THAN_WINDOW_WIDTH: "Wall width must be greater than window 120 centimeters width";
}
