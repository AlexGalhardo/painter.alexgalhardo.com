import { CSSProperties } from "react";
import { useGlobalState } from "../Context/GlobalStateContext";

export default function Home() {
    const { globalState } = useGlobalState();

    return (
        <section>
            <div className="home flex mb">
                <div className="box">
                    <h1>Paint Cans 18 liters</h1>
                    <br></br>
                    <span style={span}>
                        You need to buy: <span style={toBuySpan}>{`${globalState.TO_BUY.bigPaintCan}`}</span>{" "}
                        {`${globalState.TO_BUY.bigPaintCan === 1 ? "can" : "cans"}`}
                    </span>
                </div>
                <div className="box">
                    <h1>Paint Cans 3.6 liters</h1>
                    <br></br>
                    <span>
                        You need to buy: <span style={toBuySpan}>{`${globalState.TO_BUY.mediumPaintCan}`}</span>{" "}
                        {`${globalState.TO_BUY.mediumPaintCan === 1 ? "can" : "cans"}`}
                    </span>
                </div>
                <div className="box">
                    <h1>Paint Cans 2.5 liters</h1>
                    <br></br>
                    <span>
                        You need to buy: <span style={toBuySpan}>{`${globalState.TO_BUY.normalPaintCan}`}</span>{" "}
                        {`${globalState.TO_BUY.normalPaintCan === 1 ? "can" : "cans"}`}
                    </span>
                </div>
                <div className="box">
                    <h1>Paint Cans 0.5 liters</h1>
                    <br></br>
                    <span>
                        You need to buy: <span style={toBuySpan}>{`${globalState.TO_BUY.smallPaintCan}`}</span>{" "}
                        {`${globalState.TO_BUY.smallPaintCan === 1 ? "can" : "cans"}`}
                    </span>
                </div>
            </div>
        </section>
    );
}

const span: CSSProperties = {
    // display: "flex",
    justifyContent: "center",
    textAlign: "center",
};

const toBuySpan: CSSProperties = {
    display: "inline-block",
    color: "red",
    fontSize: 50,
};
