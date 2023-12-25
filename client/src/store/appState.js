import { makeAutoObservable } from "mobx";


class AppState{

  addDialogVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  setAddDialogVisible(status) {
    this.addDialogVisible = status
  }

}

export default new AppState()
