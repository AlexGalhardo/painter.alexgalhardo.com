import { CSSProperties, useCallback, useEffect, useState } from "react";
import { DispatchActionType, useGlobalState } from "../Context/GlobalStateContext";
import { formatCentimetersToSquareMeters } from "../Utils/MeasuresConverter";

export default function RoomWall({ label, index }: { label: string; index: number }) {
    const { globalState, dispatch } = useGlobalState();

    const [wallWidth, setWallWidth] = useState<number>(0);
    const [wallHeight, setWallHeight] = useState<number>(0);
    const [totalDoors, setTotalDoors] = useState<number>(0);
    const [totalWindows, setTotalWindows] = useState<number>(0);
    const [totalWallArea, setTotalWallArea] = useState<number>(0);
    const [totalAreaDoorsAndWindows, setTotalAreaDoorsAndWindows] = useState<number>(0);
    const [totalAreaDoors, setTotalAreaDoors] = useState<number>(0);
    const [totalAreaWindows, setTotalAreaWindows] = useState<number>(0);
    const [totalFreeWallAreaToPaint, setTotalFreeWallAreaToPaint] = useState<number>(0);
    const [businessRulesErrors, setBusinessRulesErrors] = useState<string[]>([]);

    const updatedBusinessRulesErrors = useCallback(
        (errorResume: string) => {
            return [...businessRulesErrors, errorResume];
        },
        [businessRulesErrors],
    );

    const checkIfWallHasLessThanMinimumTotalAreaAllowed = useCallback(() => {
        if (totalWallArea && totalWallArea < globalState.CONSTANTS.MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS) {
            if (
                !businessRulesErrors.includes(
                    globalState.ERRORS.WALL_AREA_IS_LESS_THAN_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
                )
            ) {
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(
                        globalState.ERRORS.WALL_AREA_IS_LESS_THAN_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
                    ),
                );
            }
        } else if (totalWallArea >= globalState.CONSTANTS.MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS) {
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) =>
                        error !==
                        globalState.ERRORS.WALL_AREA_IS_LESS_THAN_MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
                ),
            );
        }
    }, [totalWallArea]);

    const checkIfWallHasMoreThanMaxTotalAreaAllowed = useCallback(() => {
        if (totalWallArea > globalState.CONSTANTS.MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS) {
            if (
                !businessRulesErrors.includes(
                    globalState.ERRORS.WALL_AREA_IS_GREATER_THAN_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
                )
            ) {
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(
                        globalState.ERRORS.WALL_AREA_IS_GREATER_THAN_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
                    ),
                );
            }
        } else if (totalWallArea <= globalState.CONSTANTS.MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS) {
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) =>
                        error !==
                        globalState.ERRORS.WALL_AREA_IS_GREATER_THAN_MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
                ),
            );
        }
    }, [totalWallArea]);

    const checkIfSumTotalAreaDoorsAndWindowsIsNotGreaterThanFiftyPercentOfTheTotalAreaOfTheWall = useCallback(() => {
        if (totalAreaDoorsAndWindows > totalWallArea * 0.5) {
            if (
                !businessRulesErrors.includes(
                    globalState.ERRORS.TOTAL_SUM_DOORS_AND_WINDOWS_AREA_IS_GREATER_THAN_FIFTY_PERCENT_OF_THE_WALL_AREA,
                )
            )
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(
                        globalState.ERRORS
                            .TOTAL_SUM_DOORS_AND_WINDOWS_AREA_IS_GREATER_THAN_FIFTY_PERCENT_OF_THE_WALL_AREA,
                    ),
                );
        } else if (totalAreaDoorsAndWindows <= totalWallArea * 0.5) {
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) =>
                        error !==
                        globalState.ERRORS
                            .TOTAL_SUM_DOORS_AND_WINDOWS_AREA_IS_GREATER_THAN_FIFTY_PERCENT_OF_THE_WALL_AREA,
                ),
            );
        }
    }, [totalAreaDoorsAndWindows, totalWallArea]);

    const checkDoorsMeasures = useCallback(() => {
        if (totalDoors && wallHeight < globalState.CONSTANTS.MINIMUM_HEIGHT_TO_HAVE_DOOR) {
            if (!businessRulesErrors.includes(globalState.ERRORS.WALL_HEIGHT_MUST_BE_GREATER_THAN_DOOR_HEIGHT))
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(globalState.ERRORS.WALL_HEIGHT_MUST_BE_GREATER_THAN_DOOR_HEIGHT),
                );
        } else if (totalDoors === 0 || wallHeight >= globalState.CONSTANTS.MINIMUM_HEIGHT_TO_HAVE_DOOR) {
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) => error !== globalState.ERRORS.WALL_HEIGHT_MUST_BE_GREATER_THAN_DOOR_HEIGHT,
                ),
            );
        }

        if (totalDoors && wallWidth < globalState.CONSTANTS.MINIMUM_WIDTH_TO_HAVE_DOOR) {
            if (!businessRulesErrors.includes(globalState.ERRORS.WALL_WIDTH_MUST_BE_GREATER_THAN_DOOR_WIDTH))
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(globalState.ERRORS.WALL_WIDTH_MUST_BE_GREATER_THAN_DOOR_WIDTH),
                );
        } else if (totalDoors === 0 || wallWidth >= globalState.CONSTANTS.MINIMUM_WIDTH_TO_HAVE_DOOR)
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) => error !== globalState.ERRORS.WALL_WIDTH_MUST_BE_GREATER_THAN_DOOR_WIDTH,
                ),
            );
    }, [totalDoors, wallHeight, wallWidth]);

    const checkWindowsMeasures = useCallback(() => {
        if (totalWindows && wallHeight < globalState.CONSTANTS.MINIMUM_HEIGHT_TO_HAVE_WINDOW) {
            if (!businessRulesErrors.includes(globalState.ERRORS.WALL_HEIGHT_MUST_BE_GREATER_THAN_WINDOW_HEIGHT))
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(globalState.ERRORS.WALL_HEIGHT_MUST_BE_GREATER_THAN_WINDOW_HEIGHT),
                );
        } else if (totalWindows === 0 || wallHeight >= globalState.CONSTANTS.MINIMUM_HEIGHT_TO_HAVE_WINDOW) {
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) => error !== globalState.ERRORS.WALL_HEIGHT_MUST_BE_GREATER_THAN_WINDOW_HEIGHT,
                ),
            );
        }

        if (totalWindows && wallWidth < globalState.CONSTANTS.MINIMUM_WIDTH_TO_HAVE_WINDOW) {
            if (!businessRulesErrors.includes(globalState.ERRORS.WALL_WIDTH_MUST_BE_GREATER_THAN_WINDOW_WIDTH))
                setBusinessRulesErrors(
                    updatedBusinessRulesErrors(globalState.ERRORS.WALL_WIDTH_MUST_BE_GREATER_THAN_WINDOW_WIDTH),
                );
        } else if (totalWindows === 0 || wallWidth >= globalState.CONSTANTS.MINIMUM_WIDTH_TO_HAVE_WINDOW) {
            setBusinessRulesErrors(
                businessRulesErrors.filter(
                    (error) => error !== globalState.ERRORS.WALL_WIDTH_MUST_BE_GREATER_THAN_WINDOW_WIDTH,
                ),
            );
        }
    }, [totalWindows, wallHeight, wallWidth]);

    useEffect(() => {
        setTotalWallArea(wallHeight * wallWidth);
    }, [wallHeight, wallWidth]);

    useEffect(() => {
        checkIfWallHasLessThanMinimumTotalAreaAllowed();
    }, [totalWallArea < globalState.CONSTANTS.MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS]);

    useEffect(() => {
        checkIfWallHasMoreThanMaxTotalAreaAllowed();
    }, [totalWallArea > globalState.CONSTANTS.MAX_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS]);

    useEffect(() => {
        checkDoorsMeasures();
    }, [
        totalDoors && totalWallArea < globalState.CONSTANTS.MININUM_TOTAL_WALL_AREA_ALLOWED_SQUARE_CENTIMETERS,
        totalDoors && wallWidth < globalState.CONSTANTS.MINIMUM_WIDTH_TO_HAVE_DOOR,
    ]);

    useEffect(() => {
        checkWindowsMeasures();
    }, [
        totalWindows > 0 && wallHeight < globalState.CONSTANTS.MINIMUM_HEIGHT_TO_HAVE_WINDOW,
        totalWindows > 0 && wallWidth < globalState.CONSTANTS.MINIMUM_WIDTH_TO_HAVE_WINDOW,
    ]);

    useEffect(() => {
        checkIfSumTotalAreaDoorsAndWindowsIsNotGreaterThanFiftyPercentOfTheTotalAreaOfTheWall();
    }, [totalAreaDoorsAndWindows > totalWallArea * 0.5]);

    useEffect(() => {
        setTotalAreaWindows(totalWindows * globalState.WINDOW.AREA);
        setTotalAreaDoors(totalDoors * globalState.DOOR.AREA);
        setTotalAreaDoorsAndWindows(totalAreaDoors + totalAreaWindows);
        setTotalFreeWallAreaToPaint(totalWallArea - totalAreaDoorsAndWindows);
    }, [totalDoors, totalWindows, totalAreaDoors, totalAreaWindows, totalWallArea, totalAreaDoorsAndWindows]);

    useEffect(() => {
        dispatch({
            type: DispatchActionType.UPDATE_FREE_AREA_TO_PAINT,
            payload: { wallIndex: index, totalFreeWallAreaToPaint },
        });
    }, [totalFreeWallAreaToPaint, dispatch, index]);

    useEffect(() => {
        if (businessRulesErrors.length)
            dispatch({
                type: DispatchActionType.HAS_WALL_BUSINESS_RULES_ERROR,
                payload: {
                    wallIndex: index,
                    hasWallBusinessRulesErrors: !!businessRulesErrors.length,
                },
            });
        else {
            dispatch({
                type: DispatchActionType.HAS_WALL_BUSINESS_RULES_ERROR,
                payload: {
                    wallIndex: index,
                    hasWallBusinessRulesErrors: !!businessRulesErrors.length,
                },
            });
        }
    }, [businessRulesErrors.length]);

    return (
        <div className="boxMeasures">
            <h1 style={textCenter}>{label}</h1>
            <br></br>
            <label style={labelStyle} htmlFor="wallWidth">
                Width (in centimeters)
            </label>
            <input
                style={inputStyle}
                id="wallWidth"
                name={label}
                type="number"
                min={0}
                value={wallWidth}
                onChange={(e) => setWallWidth(Number(e.target.value ?? 0))}
            />{" "}
            <br></br>
            <br></br>
            <label style={labelStyle} htmlFor="wallHeight">
                Height (in centimeters)
            </label>
            <input
                style={inputStyle}
                id="wallHeight"
                name={label}
                type="number"
                min={0}
                value={wallHeight}
                onChange={(e) => setWallHeight(Number(e.target.value ?? 0))}
            />{" "}
            <br></br>
            <br></br>
            <label style={labelStyle} htmlFor="totalDoors">
                Total Doors
            </label>
            <input
                style={inputStyle}
                id="totalDoors"
                name={label}
                type="number"
                min={0}
                max={3}
                value={totalDoors}
                onChange={(e) => setTotalDoors(Number(e.target.value ?? 0))}
            />{" "}
            <br></br>
            <br></br>
            <label style={labelStyle} htmlFor="totalWindows">
                Total Windows
            </label>
            <input
                style={inputStyle}
                id="totalWindows"
                name={label}
                type="number"
                min={0}
                max={3}
                value={totalWindows}
                onChange={(e) => setTotalWindows(Number(e.target.value ?? 0))}
            />{" "}
            <br></br>
            <br></br>
            <p style={textResults}>
                Area Total: <span style={spanText}>{formatCentimetersToSquareMeters(totalWallArea)} m²</span>
            </p>
            <p style={textResults}>
                Total Doors Area: <span style={spanText}>{formatCentimetersToSquareMeters(totalAreaDoors)} m²</span>
            </p>
            <p style={textResults}>
                Total Windows Area: <span style={spanText}>{formatCentimetersToSquareMeters(totalAreaWindows)} m²</span>
            </p>
            <p style={textResults}>
                Total Area Doors + Windows:{" "}
                <span style={spanText}>{formatCentimetersToSquareMeters(totalAreaDoorsAndWindows)} m²</span>
            </p>
            <p style={textResults}>
                Total Free Area To Paint:{" "}
                <span style={spanText}>{formatCentimetersToSquareMeters(totalFreeWallAreaToPaint)} m²</span>
            </p>
            {businessRulesErrors.map((value, index) => (
                <p key={index} style={errorAlert}>
                    {value}
                </p>
            ))}
        </div>
    );
}

const generalStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: "var(--color-2)",
    padding: "var(--gap-s) .75rem",
    backgroundColor: "var(--color-4)",
    borderRadius: "var(--gap)",
};

const labelStyle: CSSProperties = {
    display: "inline-block",
    marginBottom: "var(--gap-s)",
    fontWeight: "600",
    width: "60%",
    textAlign: "center",
    fontSize: "1.2rem",
};

const textResults: CSSProperties = {
    fontWeight: "600",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
};

const spanText: CSSProperties = {
    display: "inline-block",
    marginBottom: "var(--gap-s)",
    fontWeight: "600",
    textAlign: "center",
    width: "40%",
};

const inputStyle: CSSProperties = {
    border: "0px solid blue",
    fontFamily: "Josefin Sans",
    marginLeft: "10px",
    width: "30%",
    fontWeight: "bolder",
    textAlign: "center",
    ...generalStyle,
};

const textCenter: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
};

const errorAlert: CSSProperties = {
    padding: "20px",
    border: "1px solid transparent",
    borderRadius: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#f2dede",
    borderColor: "#ebccd1",
    color: "#a94442",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
