export const A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS = isNaN(
    parseInt(import.meta.env.VITE_A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS),
)
    ? 50_000 // 5m²
    : parseInt(import.meta.env.VITE_A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS);

export const LITERS_SMALL_CAN_OF_PAINT = isNaN(import.meta.env.VITE_LITERS_SMALL_CAN_OF_PAINT)
    ? 0.5
    : parseInt(import.meta.env.VITE_LITERS_SMALL_CAN_OF_PAINT);

export const LITERS_NORMAL_CAN_OF_PAINT = isNaN(import.meta.env.VITE_LITERS_NORMAL_CAN_OF_PAINT)
    ? 2.5
    : parseInt(import.meta.env.VITE_LITERS_NORMAL_CAN_OF_PAINT);

export const LITERS_MEDIUM_CAN_OF_PAINT = isNaN(import.meta.env.VITE_LITERS_MEDIUM_CAN_OF_PAINT)
    ? 3.6
    : parseInt(import.meta.env.VITE_LITERS_MEDIUM_CAN_OF_PAINT);

export const LITERS_LARGE_CAN_OF_PAINT = isNaN(import.meta.env.VITE_LITERS_LARGE_CAN_OF_PAINT)
    ? 18
    : parseInt(import.meta.env.VITE_LITERS_LARGE_CAN_OF_PAINT);

export const MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS = isNaN(
    import.meta.env.VITE_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
)
    ? 10_000 // 10m²
    : parseInt(import.meta.env.VITE_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS);

export const MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS = isNaN(
    import.meta.env.VITE_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
)
    ? 500_000 // 50m²
    : parseInt(import.meta.env.VITE_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS);

export const DOOR_HEIGHT = isNaN(import.meta.env.VITE_DOOR_HEIGHT)
    ? 190 // 1.9m
    : parseInt(import.meta.env.VITE_DOOR_HEIGHT);

export const DOOR_WIDTH = isNaN(import.meta.env.VITE_DOOR_WIDTH)
    ? 80 // 0.8m
    : parseInt(import.meta.env.VITE_DOOR_WIDTH);

export const WINDOW_HEIGHT = isNaN(import.meta.env.VITE_WINDOW_HEIGHT)
    ? 200 // 2m
    : parseInt(import.meta.env.VITE_WINDOW_HEIGHT);

export const WINDOW_WIDTH = isNaN(import.meta.env.VITE_WINDOW_WIDTH)
    ? 120 // 1.2m
    : parseInt(import.meta.env.VITE_WINDOW_WIDTH);
