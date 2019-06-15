# [Redux Thunk Promise](https://www.npmjs.com/package/redux-thunk-promise): [Thunk](https://www.npmjs.com/package/redux-thunk) and [FSA-compliant promise](https://www.npmjs.com/package/redux-promise) middleware for Redux

A couple of months ago, we were discussing in the team how to simplify the code that wires async actions with components in Redux. There are several approaches out there ([thunk](https://www.npmjs.com/package/redux-thunk)s, [promises](https://www.npmjs.com/package/redux-promise), [sagas](https://www.npmjs.com/package/redux-saga)) and we noticed that we are using all of them in different projects of our platform. In order to stop reinventing the wheel, we decided to sit down and simplify our codebases by defining the following goals:

1.  Reduce the boilerplate at a minimum. _Something should write that code for us._
2.  _Ideally_, write **sync** & **async** action using the same syntax at the component/container level.
3.  _Try to get the best of all worlds_: The ability to _dispatch_ other actions and get information from the _state_ (from **thunks**). And the simplicity of firing async calls and getting the result in the reducer, even if it’s not successful (from **promises**).

With these ideas in mind, [Redux Thunk Promise](https://www.npmjs.com/package/redux-thunk-promise) was born. But before going into the details, let’s talk about some basic concepts concepts a little bit.

> **Note:** if you already know about Thunks and Promises, you can skip the following sections and go straight to the [npm package](https://www.npmjs.com/package/redux-thunk-promise) or the [code](https://github.com/nanovazquez/redux-thunk-promise).

### What is a Thunk?

[As explained here](https://github.com/reduxjs/redux-thunk), a [thunk](https://en.wikipedia.org/wiki/Thunk) is a function that wraps an expression to delay its evaluation.

For instance, the following expression:

``const sum = 1 + 2;```

is calculated immediately. But if we write a function:

`const sum = () => 1 + 2;`

we are delaying the execution of the expression for later.

This same concept is the one we apply in Redux: we create thunks (functions) that will be executed later and will retrieve the information we need, usually from a backend service.

### What is an FSA-compliant promise middleware?

A [Flux Standard action](https://github.com/redux-utilities/flux-standard-action) (FSA), is a human-friendly standard for Flux action objects. It is a basic convention that simplifies the manipulation of actions in your reducers by defining the following rules:

1.  An action MUST be a plain JavaScript object and have a `type` property.
2.  An action MAY have: an `error` property, a `payload` property and a `meta` property.
3.  An action MUST NOT include properties other than `type`, `payload`, `error`, and `meta`.

For instance, this is an example of a Flux Standard Action (FSA):

```
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'
  }
}
```

And this is an FSA that represents an error (or a rejected promise):

```
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

This middleware is FSA-compliant because it will convert the result of promises into FSA.

### So….how do you use redux-thunk-promise?

> **Note:** see the installation steps and a real-life example [here](https://github.com/nanovazquez/redux-thunk-promise#installation).

Let’s say you want to define two actions, one to fetch tasks from your server (async) and other to mark tasks as completed in the UI (sync). You can do this by using the following code in your Redux container:

```
const mapStateToProps = state => { ... };

const mapDispatchToProps = dispatch => ({
  // async action
  fetchTasks: () => dispatch(actions.fetchTasks()),
  // sync action
  completeTask: taskId => dispatch(actions.completeTask({ id })), });

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

Then, you can write your async actions in two different ways:

**As an FSA-compliant promise:**

```
import { createAction } from ‘redux-actions’;
import { actions as uiActions } from ‘../ui’;
import actionTypes from ‘./action-types’;
import tasksService from ‘./tasks-service’;

...

const fetchTasksFromService = () => tasksService.fetchTasks();

export default {
  fetchTasks: createAction(actionTypes.FETCH_TASKS, fetchTasksFromService),
  completeTask: createAction(actionTypes.COMPLETE_TASK),
};
```

**As a Thunk:**

```
import { createAction } from ‘redux-actions’;
import actionTypes from ‘./action-types’;
import tasksService from ‘./tasks-service’;
import { actions as uiActions } from ‘../ui’;</pre>

...

const fetchTasksFromService = () => ({ dispatch, getState, extraArguments }) => {
  dispatch(uiActions.isLoading(true));
  // The result of the call will be sent to reducers as the payload
  // of the FETCH_TASKS action. If there was an error, action.error
  // will be set to true
  return tasksService.fetchTasks()
    .then(() => actions.isLoading(false))
    .catch(() => actions.isLoading(false));
};</pre>

export default {
  fetchTasks: createAction(actionTypes.FETCH_TASKS, fetchTasksFromService),
  completeTask: createAction(actionTypes.COMPLETE_TASK),
};
```

> **Note:** No matter which approach you choose for your async actions, your reducers will always receive an [FSA-compliant action](https://github.com/redux-utilities/flux-standard-action#example).

Every time an action is triggered, the middleware will execute the following simple, but yet powerful, logic:

1. If it receives a thunk, it executes it.
1. If it receives a Flux Standard Action (FSA) whose `payload` is a promise, it will dispatch its result, successful or not.
1. If it receives a Flux Standard Action (FSA) whose `payload` is a thunk, it executes the thunk. Then, if the result is a promise, it will dispatch its result, successful or not (same as 2).

Hope you like this approach. Feel free to start playing with it and send your feedback! 🚀🚀
