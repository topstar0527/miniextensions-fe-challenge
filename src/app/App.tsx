import Airtable from "airtable";
import { useSelector, useDispatch } from "react-redux";
import React, { FunctionComponent, Fragment, useEffect, useCallback } from "react";

import Form from "../pages/Form/Form";
import Classes from "../pages/Class/Classes";
import { selectData, selectError, selectLoading, selectLoggedIn, selectUser, setData, setLoading, setLoggedIn, setUser, setError } from "./appSlice";

import { AppProps, AppState } from "../types";

////////////////////////////////////////////////////////////////////////////////
const base = new Airtable({ apiKey: "" }).base("app8ZbcPx7dkpOnP0"); ////

const App: FunctionComponent<AppProps> = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const loggedIn = useSelector(selectLoggedIn);

  const generateIDFormula = (data: string[] = []) => `OR(${data.map((id) => `RECORD_ID()="${id}"`)})`;

  const logout = useCallback(() => {
    dispatch(setUser(""));
    dispatch(setData({}));
    dispatch(setLoggedIn(false));
  }, [dispatch]);

  useEffect(() => {
    function reportError(err: any, message?: string) {
      console.error(err);
      dispatch(setError(message ?? err));
      logout();
    }

    async function getResults() {
      dispatch(setLoading(true));
      dispatch(setError(""));

      base("Students").select({
        maxRecords: 1,
        view: "Grid view",
        filterByFormula: `({Name}="${user}")`
      }).firstPage(async (err, records = []) => {
        if (err) reportError(err, "Could not get student !!!");
        else if (records.length < 1) reportError(`Student "${user}" does not exist !!!`);
        else {
          const data: AppState['data'] = {};
          await base("Classes").select({
            filterByFormula: generateIDFormula(records[0].get("Classes") as string[])
          }).eachPage(async (classes, next) => {
            await Promise.all(classes.map(async function (classRecord) {
              const Name = classRecord.get("Name") as string;
              const Students: string[] = [];

              await base("Students").select({
                filterByFormula: generateIDFormula(classRecord.get("Students") as string[])
              }).eachPage((students, next) => {
                Students.push(...students.map((student) => student.get("Name") as string));
                next();
              });

              data[Name] = { Name, Students };
            }));
            next();
          });

          dispatch(setData(data));
          dispatch(setLoggedIn(true));
        }

        dispatch(setLoading(false));
      });
    }

    if (user !== "") getResults();
  }, [user, dispatch, logout]);

  return (
    <Fragment>
      {loading === true ? (
        <span className="loading">
          Loading...
        </span>
      ) : (
        loggedIn === false ? (
          <Form
            error={error}
            onSubmit={user => dispatch(setUser(user))}
          />
        ) : (
          <Classes
            data={data}
            handleLogout={logout}
          />
        )
      )}
    </Fragment>
  );
};

export default App;
