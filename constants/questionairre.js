import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const CUSTOM_QUESTION_OPTS = {
  answer_types: [
    {
      id: 1,
      value: 1,
      display: "Text",
      selected: true,
    },
    {
      id: 2,
      value: 2,
      display: "Radio",
      selected: false,
    },
    {
      id: 3,
      value: 3,
      display: "Checkbox",
      selected: false,
    },
    {
      id: 4,
      value: 4,
      display: "Dropdown",
      selected: false,
    },
    {
      id: 5,
      value: 5,
      display: "Multiselect",
      selected: false,
    },

    {
      id: 6,
      value: 7,
      display: "DateTime",
      selected: false,
    },
  ],
  maxLength: {
    default: 100,
  },
  helptext:{
    text_1:'Questions that would be asked to your attendees before registration.',
    text_2:'Pre Questionairre for your attendees before registration'
  },
  icons: {
    AddQuestion: <AddIcon fontSize="small"/>,
    RemoveQuestion: <RemoveIcon/>,
    EditQuestion:<EditIcon fontSize="small"/>,
    DeleteQuestion: <DeleteIcon fontSize="small"/>
  },
};
