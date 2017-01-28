export const EDIT_QUESTION_1 = 'T2.SECURITY.EDIT_QUESTION_1';
export const EDIT_QUESTION_2 = 'T2.SECURITY.EDIT_QUESTION_2';
export const EDIT_PIN_FORM = 'T2.SECURITY.EDIT_PIN_FORM';
export const SWITCH_TO_APP_PROVIDER = 'T2.SECURITY.SWITCH_TO_APP_PROVIDER';
export const SWITCH_TO_SECURITY_PROVIDER = 'T2.SECURITY.SWITCH_TO_SECURITY_PROVIDER';
export const editQuestion = (type:string,questionId:string,answer: string) => {
  return {
    type,
    questionId,
    answer
  }
}

export const switchToAppProvider = () => {
  return {
    type: SWITCH_TO_APP_PROVIDER
  }
}

export const switchToSecurityProvider = () => {
  return {
    type: SWITCH_TO_SECURITY_PROVIDER
  }
}

export const editQuestion1 = (questionId:string,answer: string) => {
  return editQuestion(EDIT_QUESTION_1, questionId, answer);
}

export const editQuestion2 = (questionId:string,answer: string) => {
  return editQuestion(EDIT_QUESTION_2, questionId, answer);
}


export const editPinForm = (question1Id:string,answer1: string,question2Id:string,answer2: string) => {
  return {
    type: EDIT_PIN_FORM,
    question1Id,
    question2Id,
    answer1,
    answer2
  }
}
