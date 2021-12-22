import IAddData from './tasks.addData'

export default interface IModalAdd extends IAddData {
    completedDate: string,
    title: string,
    description: string,
    showError: boolean,
    errors: string,
    inputIndicate: boolean,
    textareaIndicate: boolean,
    dataIndicate: boolean
}
