export default interface IActivity {
    message: string,
    photo: string,
    time: string,
    images?: {
        name: string,
        imageItem: string
    }[],
    outpost?: string
}
