import IHeaderTitlebanner from './headertitlebanner.interfaces'

export default interface ITasks extends IHeaderTitlebanner {
    message: string,
    time: string,
    status: string
}
