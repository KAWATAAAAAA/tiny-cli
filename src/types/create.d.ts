export declare type RepoName = string
export declare type TagName = string
export declare type AppName = string
export declare type Executor = Function
export declare type LoadingMsg = string
export declare interface FileActions {
  Overwrite:() => void,
  Merge:() => void,
  Cancel:() => void,
  [key:string]:Function
}
export declare interface FileActionsResult {
  exit:boolean
}
export declare interface InquirerPromptResult {
  [key:string]:string
}
