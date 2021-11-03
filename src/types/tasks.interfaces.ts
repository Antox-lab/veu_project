import ITitleBanner from './titlebanner.interfaces'

export default interface ITasks extends ITitleBanner {
    message: string,
    time: string,
    alt: string
}
