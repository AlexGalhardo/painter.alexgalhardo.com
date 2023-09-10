import RoomWall from "./RoomWall";

export default function Room() {
    const wallAttributes = [
        {
            index: 1,
            label: "First Wall",
        },
        {
            index: 2,
            label: "Second Wall",
        },
        {
            index: 3,
            label: "Third Wall",
        },
        {
            index: 4,
            label: "Fourth Wall",
        },
    ];

    return (
        <div className="flex">
            {wallAttributes.map((item) => (
                <RoomWall key={item.index} {...item} />
            ))}
        </div>
    );
}
