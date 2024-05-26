import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import {
    DOOR_HEIGHT,
    DOOR_WIDTH,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
    A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS,
    LITERS_LARGE_CAN_OF_PAINT,
    LITERS_MEDIUM_CAN_OF_PAINT,
    LITERS_NORMAL_CAN_OF_PAINT,
    LITERS_SMALL_CAN_OF_PAINT,
    MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
    MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
} from "../Utils/Envs";
import {
    BussinessRulesConstants,
    BussinessRulesErrorsMessages,
    PaintCansToBuy,
    RoomStatus,
    WallDoor,
    WallWindow,
} from "../Utils/DomainInterfaces";

interface GlobalState {
    CONSTANTS: BussinessRulesConstants;
    DOOR: WallDoor;
    WINDOW: WallWindow;
    ERRORS: BussinessRulesErrorsMessages;
    TO_BUY: PaintCansToBuy;
    ROOM: RoomStatus;
}

export enum DispatchActionType {
    UPDATE_FREE_AREA_TO_PAINT,
    HAS_WALL_BUSINESS_RULES_ERROR,
}

interface DispatchAction {
    type: DispatchActionType;
    payload: { wallIndex: number; totalFreeWallAreaToPaint?: number; hasWallBusinessRulesErrors?: boolean };
}

interface GlobalStateContextPort {
    globalState: GlobalState;
    dispatch: React.Dispatch<DispatchAction>;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const useData = () => {
    const context = useContext(GlobalStateContext);
    if (!context) throw new Error("useData must be used in a component inside GlobalStateProvider");
    return context;
};

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const startGlobalState: GlobalState = {
        CONSTANTS: {
            MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS, // 1m²

            MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS, // 50m²

            SMALL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS:
                LITERS_SMALL_CAN_OF_PAINT * A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS, // 25_000   cm² = 2.5m²
            NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS:
                LITERS_NORMAL_CAN_OF_PAINT * A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS, // 125_000  cm² = 12.5 m²
            MEDIUM_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS:
                LITERS_MEDIUM_CAN_OF_PAINT * A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS, // 180_0000 cm² = 18m²
            LARGE_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS:
                LITERS_LARGE_CAN_OF_PAINT * A_LITER_OF_PAINT_PAINTS_IN_SQUARE_CENTIMETERS, // 900_000  cm² = 90m²

            MINIMUM_HEIGHT_TO_HAVE_DOOR: DOOR_HEIGHT + 30, // 2.2m
            MINIMUM_WIDTH_TO_HAVE_DOOR: DOOR_WIDTH, // 0.8m
            MINIMUM_HEIGHT_TO_HAVE_WINDOW: WINDOW_HEIGHT, // 1.2m
            MINIMUM_WIDTH_TO_HAVE_WINDOW: WINDOW_WIDTH, // 2m
        },

        DOOR: {
            HEIGHT: DOOR_HEIGHT, // 1.9m
            WIDTH: DOOR_WIDTH, // 0.8m
            AREA: DOOR_HEIGHT * DOOR_WIDTH, // 1.52 m²
        },

        WINDOW: {
            HEIGHT: WINDOW_HEIGHT, // 1.2m
            WIDTH: WINDOW_WIDTH, // 2m
            AREA: WINDOW_HEIGHT * WINDOW_WIDTH, // 2.4 m²
        },

        ERRORS: {
            WALL_AREA_IS_LESS_THAN_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS: "Wall must has at least 1 m²",
            WALL_AREA_IS_GREATER_THAN_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS:
                "Wall should not has more than 50 m²",
            TOTAL_SUM_DOORS_AND_WINDOWS_AREA_IS_GREATER_THAN_FIFTY_PERCENT_OF_THE_WALL_AREA:
                "Total area of ​​doors and windows should not be greater than 50% of the total area of ​​the wall",
            WALL_HEIGHT_MUST_BE_GREATER_THAN_DOOR_HEIGHT:
                "Wall height must be greater than door 190 centimeters height",
            WALL_WIDTH_MUST_BE_GREATER_THAN_DOOR_WIDTH: "Wall width must be greater than door 80 centimeters width",
            WALL_HEIGHT_MUST_BE_GREATER_THAN_WINDOW_HEIGHT:
                "Wall height must be greater than window 200 centimeters height",
            WALL_WIDTH_MUST_BE_GREATER_THAN_WINDOW_WIDTH:
                "Wall width must be greater than window 120 centimeters width",
        },

        TO_BUY: {
            bigPaintCan: 0,
            mediumPaintCan: 0,
            normalPaintCan: 0,
            smallPaintCan: 0,
        },

        ROOM: {
            hasWallBusinessRulesErrors: [false, false, false, false],
            wallsFreeAreasToPaint: [0, 0, 0, 0],
        },
    };

    const reducer = (globalState: GlobalState, action: DispatchAction): GlobalState => {
        const { payload } = action;

        switch (action.type) {
            case DispatchActionType.UPDATE_FREE_AREA_TO_PAINT:
                if (payload.wallIndex) {
                    globalState.ROOM.wallsFreeAreasToPaint[payload.wallIndex - 1] =
                        payload.totalFreeWallAreaToPaint ?? 0;
                }
                return { ...globalState, ...action };

            case DispatchActionType.HAS_WALL_BUSINESS_RULES_ERROR:
                globalState.ROOM.hasWallBusinessRulesErrors[payload.wallIndex - 1] =
                    payload.hasWallBusinessRulesErrors ?? false;

                if (globalState.ROOM.hasWallBusinessRulesErrors.some(Boolean)) {
                    globalState.TO_BUY = {
                        bigPaintCan: 0,
                        mediumPaintCan: 0,
                        normalPaintCan: 0,
                        smallPaintCan: 0,
                    };
                }
                return { ...globalState, ...action };

            default:
                return globalState;
        }
    };

    const [globalState, dispatch] = useReducer(reducer, startGlobalState);

    const setTotalBigCansToUse = useCallback(
        (remainingFreeRoomAreaToPaint: number) => {
            const largeCanCoverage = globalState.CONSTANTS.LARGE_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS;

            if (remainingFreeRoomAreaToPaint % largeCanCoverage === 0) {
                globalState.TO_BUY.bigPaintCan = remainingFreeRoomAreaToPaint / largeCanCoverage;
                globalState.TO_BUY.mediumPaintCan = 0;
                globalState.TO_BUY.normalPaintCan = 0;
                globalState.TO_BUY.smallPaintCan = 0;
                return 0;
            }

            const bigCansNeeded = Math.floor(remainingFreeRoomAreaToPaint / largeCanCoverage);
            const remainingArea = remainingFreeRoomAreaToPaint % largeCanCoverage;

            globalState.TO_BUY.bigPaintCan = bigCansNeeded;

            return remainingArea;
        },
        [globalState.CONSTANTS.LARGE_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS, globalState.TO_BUY],
    );

    const setTotalMediumCansToUse = useCallback(
        (remainingFreeRoomAreaToPaint: number) => {
            const mediumCanCoverage = globalState.CONSTANTS.MEDIUM_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS;

            if (remainingFreeRoomAreaToPaint % mediumCanCoverage === 0) {
                globalState.TO_BUY.mediumPaintCan = remainingFreeRoomAreaToPaint / mediumCanCoverage;
                globalState.TO_BUY.normalPaintCan = 0;
                globalState.TO_BUY.smallPaintCan = 0;
                return 0;
            }

            const mediumCansNeeded = Math.floor(remainingFreeRoomAreaToPaint / mediumCanCoverage);
            const remainingArea = remainingFreeRoomAreaToPaint % mediumCanCoverage;

            globalState.TO_BUY.mediumPaintCan = mediumCansNeeded;

            return remainingArea;
        },
        [globalState.TO_BUY, globalState.CONSTANTS.MEDIUM_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS],
    );

    const setTotalNormalCansToUse = useCallback(
        (remainingFreeRoomAreaToPaint: number) => {
            if (remainingFreeRoomAreaToPaint % globalState.CONSTANTS.NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS === 0) {
                globalState.TO_BUY.normalPaintCan =
                    remainingFreeRoomAreaToPaint / globalState.CONSTANTS.NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS;
                globalState.TO_BUY.smallPaintCan = 0;
                return 0;
            }

            globalState.TO_BUY.normalPaintCan = Math.floor(
                remainingFreeRoomAreaToPaint / globalState.CONSTANTS.NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS,
            );

            return remainingFreeRoomAreaToPaint % globalState.CONSTANTS.NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS;
        },
        [globalState.CONSTANTS.NORMAL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS, globalState.TO_BUY],
    );

    const setTotalSmallCansToUse = useCallback(
        (remainingFreeRoomAreaToPaint: number) => {
            globalState.TO_BUY.smallPaintCan = !isFinite(
                Math.ceil(
                    remainingFreeRoomAreaToPaint / globalState.CONSTANTS.SMALL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS,
                ),
            )
                ? 1
                : Math.ceil(
                      remainingFreeRoomAreaToPaint / globalState.CONSTANTS.SMALL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS,
                  );
            return 0;
        },
        [globalState.CONSTANTS.SMALL_PAINT_CAN_PAINTS_SQUARE_CENTIMETERS, globalState.TO_BUY],
    );

    const recommendPaintCansToBuy = useCallback(() => {
        if (!globalState.ROOM.hasWallBusinessRulesErrors.includes(true)) {
            let remainingFreeRoomAreaToPaint = globalState.ROOM.wallsFreeAreasToPaint.reduce(
                (accumulator, currentValue) => {
                    return accumulator + currentValue;
                },
                0,
            );

            const setPaintCansTotalToBuy = [
                setTotalBigCansToUse,
                setTotalMediumCansToUse,
                setTotalNormalCansToUse,
                setTotalSmallCansToUse,
            ];

            for (const setSize of setPaintCansTotalToBuy) {
                remainingFreeRoomAreaToPaint = setSize(remainingFreeRoomAreaToPaint);
                if (remainingFreeRoomAreaToPaint <= 0) {
                    break;
                }
            }
        }
    }, [
        globalState.ROOM.hasWallBusinessRulesErrors,
        globalState.ROOM.wallsFreeAreasToPaint,
        setTotalBigCansToUse,
        setTotalMediumCansToUse,
        setTotalNormalCansToUse,
        setTotalSmallCansToUse,
    ]);

    const contextValue = useMemo(() => {
        recommendPaintCansToBuy();
        return { globalState, dispatch };
    }, [globalState, dispatch, recommendPaintCansToBuy]);

    return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = (): GlobalStateContextPort => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used inside GlobalStateProvider");
    }
    return context;
};
