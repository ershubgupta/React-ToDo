import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, CardColumns, Badge, Toast } from 'react-bootstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// import DatePicker from './';
import firebase from '../Config/firebase';
import './style.scss'
export default function ToDo() {
  // let textInput = React.createRef();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [occurence, setOccurence] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [cycle, setCycle] = useState('');
  const [tag, setTag] = useState('');
  const [ToDoList, setToDoList] = useState({ list: [] });
  const [completed, setCompleted] = useState({ list: [] });
  const newlyAdded = firebase.database().ref('todo');
  const completedItem = firebase.database().ref('completed');
  // let updatedList = [];
  // let 
  // console.log(startDate);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Octr', 'Nov', 'Dec']
  var formatDate;
  const addTodo = (e) => {
    e.preventDefault();
    if (title !== '' || desc !== '') {
      console.log(startDate)
      if (occurence === 'Recurring') {
        startDate.setDate(startDate.getDate() + (parseInt(cycle) - 1)) //-1 from cycle to include current and last day
      }
      formatDate = startDate.getDate() + ' ' + months[(startDate.getMonth())] + ' ' + startDate.getFullYear();
      newlyAdded.push({
        'createdDate': startDate.getTime(),
        'lastUpdatedDate': startDate.getTime(),
        'title': title,
        'desc': desc,
        'occurence': occurence != '' ? occurence : 'Single',
        'startDate': formatDate,
        'cycle': cycle != '' ? cycle : '',
        'tag': tag
      });
      resetFields();
    }
  }

  let fieldChecked = false;
  const resetFields = (e) => {
    setTitle('');
    setDesc('');
    setOccurence('');
    setStartDate(new Date());
    setCycle('');
    setTag('');
    fieldChecked = false;
  }

  useEffect(() => {
    newlyAdded.on('value', (snapshot) => {
      let updatedList = [];
      let dbToDoItems = snapshot.val();

      for (let list in dbToDoItems) {
        updatedList.push({
          id: list,
          title: dbToDoItems[list].title,
          desc: dbToDoItems[list].desc,
          occurence: dbToDoItems[list].occurence,
          startDate: dbToDoItems[list].startDate,
          cycle: dbToDoItems[list].cycle,
          tag: dbToDoItems[list].tag
        })
      }
      setToDoList({ list: updatedList });
    })
    completedItem.on('value', (snapshot) => {
      let dbCompletedList = snapshot.val();
      let updatedList = [];
      for (let list in dbCompletedList) {
        updatedList.push({
          id: list,
          title: dbCompletedList[list].title,
          desc: dbCompletedList[list].desc,
          occurence: dbCompletedList[list].occurence,
          startDate: dbCompletedList[list].startDate,
          cycle: dbCompletedList[list].cycle,
          tag: dbCompletedList[list].tag
        })
      }
      setCompleted({ list: updatedList });
    })
  }, [])

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const onDescChange = (e) => {
    setDesc(e.target.value);
  }
  const onOccurenceChange = (e) => {
    setOccurence(e.target.value);

  }
  const onStartDateChange = (e) => {
    setStartDate(e);
  }
  const onCycleChange = (e) => {
    setCycle(e.target.value);
    // console.log(e)
  }
  const onTagChange = (e) => {
    setTag(e.target.value);
  }

  const markDone = (targetIndexNum) => {
    const completedTaskData = firebase.database().ref(`/todo/${targetIndexNum}`);
    newlyAdded.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        let dbTodoList = snapshot.val();
        console.log(dbTodoList)
        completedItem.push(dbTodoList[targetIndexNum]);
      }
    });
    completedTaskData.remove();
  }

  const mardDoneRecurring = (targetIndexNum) => {
    const recurringTaskData = firebase.database().ref(`/todo/${targetIndexNum}`);
    let modifiedDate, updateRecurring;
    recurringTaskData.once('value', function (snapshot) {
      let lastUpdateDateToDate = new Date(snapshot.val().lastUpdatedDate);
      modifiedDate = new Date(lastUpdateDateToDate.setDate(lastUpdateDateToDate.getDate() + (parseInt(snapshot.val().cycle) - 1))) //-1 from cycle to include current and last day
      updateRecurring = modifiedDate.getDate() + ' ' + months[(modifiedDate.getMonth())] + ' ' + modifiedDate.getFullYear();
    });

    recurringTaskData.update({
      lastUpdatedDate: updateRecurring,
      startDate: updateRecurring
    });
  }

  // const modifyTask = (targetIndexNum) => {
  //   const recurringTaskData = firebase.database().ref(`/todo/${targetIndexNum}`);
  // }

  const removeTodo = (targetIndexNum) => {
    const removeTask = firebase.database().ref(`/completed/${targetIndexNum}`);
    // completedItem.on('value', (snapshot) => {
    //   if (snapshot.val() != null ) {
    //     let dbTodoList = snapshot.val();
    //     completedItem.push(dbTodoList[targetIndexNum]);
    //   }
    // });
    removeTask.remove();
  }
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={4} className="todo-form">
          <h3>Task</h3>
          <form className={''} noValidate autoComplete="off" onSubmit={addTodo}>

            <TextField
              id="outlined-full-width"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="title"
              value={title}
              onChange={onTitleChange}
            />
            <TextField
              id="outlined-full-width"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="desc"
              value={desc}
              onChange={onDescChange}
            />
            <FormLabel component="legend">Type Of Task</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={occurence} onChange={onOccurenceChange}>
              <FormControlLabel
                name="occurence"
                control={<Radio />}
                id="singleOccur"
                label="One Time"
                value="Single"
              // onChange={onOccurenceChange}
              />
              <FormControlLabel
                name="occurence"
                control={<Radio />}
                id="multiOccur"
                value="Recurring"
                label="Recurring"
              // onChange={onOccurenceChange}
              />
            </RadioGroup>

            {occurence != "Recurring" ? '' :
              <>
                <MuiPickersUtilsProvider >
                  <DatePicker
                    label="Basic example"
                    value={startDate}
                    // DialogProps={{ "aria-activedescendant": "12" }}
                    onChange={date => onStartDateChange(date)}
                  />

                </MuiPickersUtilsProvider>
                <TextField
                  id="outlined-full-width"
                  label="Frequency"
                  style={{ margin: 8 }}
                  placeholder="Frequency"
                  helperText="Full width!"
                  fullWidth
                  margin="normal"
                  name="cycle"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={cycle}
                  onChange={onCycleChange}
                />
              </>
            }
            <TextField
              id="outlined-full-width"
              label="Frequency"
              style={{ margin: 8 }}
              placeholder="Frequency"
              helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="tag"
              value={tag}
              onChange={onTagChange}
            />
            <Button variant="success" type="submit">ADD</Button>
            <Button variant="danger" size={'sm'} onClick={resetFields} className={'ml-2'}>Reset</Button>
          </form>
          {/* </CardColumns> */}
        </Col>
        <Col xs={12} md={4} className={'fixed-height'}>
          <Row className={'flex-wrap-reverse'}>
            {ToDoList.list.map((list, i) => (
              <Card className={''} variant="outlined" key={i}>
                <CardContent>
                  <Typography className={''} color="textSecondary" gutterBottom>
                    {list.title}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {list.desc}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {list.tag != '' ? <Chip label={list.tag} className={'mr-2'} /> : ''}
                    <small><Chip label={list.occurence} className={''} /></small>
                    {list.cycle != '' ? <Chip label={list.cycle} className={'mr-2'} /> : ''}
                    <Chip label={list.startDate} className={'ml-2'} />
                  </Typography>
                </CardContent>
                <CardActions>
                  {list.occurence == 'Recurring' ? <Button size="small" onClick={mardDoneRecurring.bind(this, list.id)}>Recurring Done</Button> : ''}

                  <Button size="small" onClick={markDone.bind(this, list.id)}>Mark Done</Button>
                </CardActions>
              </Card>
            ))}
          </Row>
        </Col>

        <Col xs={12} md={4} className={'fixed-height'}>
          <Row className={'flex-wrap-reverse'}>
            {completed.list.map((list, i) => (
              <Card className={''} variant="outlined" key={i}>
                <CardContent>
                  <Typography className={''} color="textSecondary" gutterBottom>
                    {list.title}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {list.desc}
                  </Typography>
                  <Typography className={''} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    {list.tag != '' ? <Chip label={list.tag} className={'mr-2'} /> : ''}
                    <small><Chip label="Completed" className={''} /></small>
                    <Chip label={list.occurence} className={'ml-2'} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={removeTodo.bind(this, list.id)}>Remove</Button>
                </CardActions>
              </Card>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
