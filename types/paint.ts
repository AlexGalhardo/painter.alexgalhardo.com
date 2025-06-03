export interface Wall {
	width: number;
	height: number;
	doors: number;
	windows: number;
	totalArea: number;
	paintableArea: number;
	errors: string[];
}

export interface PaintCans {
	large: number;
	medium: number;
	normal: number;
	small: number;
}

export interface ValidationConstants {
	MIN_WALL_AREA: number;
	MAX_WALL_AREA: number;
	DOOR_AREA: number;
	WINDOW_AREA: number;
	DOOR_MIN_HEIGHT: number;
	DOOR_MIN_WIDTH: number;
	WINDOW_MIN_HEIGHT: number;
	WINDOW_MIN_WIDTH: number;
}
