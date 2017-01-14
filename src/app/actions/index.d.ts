export = Actions;
export as namespace Actions;
declare namespace Actions {

  interface BasicAction {
    type: string
    [propName: string]: any;
  }


  function hideFlashMessage(): BasicAction;

  function showFlashMessage(text: string): BasicAction;

  function toggleT2AppFromMyList(id: number): BasicAction;
  function formSubmitted(formId: number,fields: any): BasicAction;
  function fieldChange(field: any): BasicAction;
  function checkIsOnline(msg: string): BasicAction;
  const SHOW_FLASH_MESSAGE: string;
  const HIDE_FLASH_MESSAGE: string;
  const TAB_CHANGE_INDEX: string;
  const ORIENTATION_CHANGE: string;
  const WINDOW_RESIZE: string;
  const FORM_FIELD_CHANGE: string;
  const FORM_SUBMITTED: string;
}