export interface RootState {
    form: FormState; // State of Form COmponent
    app: AppState; // State of App Component
  }
  
  export interface AppProps {}
  
  export type AppState = {
    error: string; // error string
    loading: boolean; // loading 
    user: string; // student name
    loggedIn: boolean; // logged in / out 
    data: ClassesProps['data']; // Student's Data
  };
  
  export interface FormProps {
    onSubmit(value: string): void; // submit callback
    error: string; // error message
  }
  
  export interface FormState {
    value: string; // value of Form
  }
  
  export interface ClassData {
    Name: string; // name of class
    Students: string[]; // students name array who has class
  }
  
  export interface ClassesProps {
    //  returned from the view with the class's record ID as
    data: {
      [key: string]: ClassRecord; // Student's Data
    };
    handleLogout(): void; // logout function
  }
  