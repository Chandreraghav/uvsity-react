import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export const CUSTOM_QUESTION_OPTS = {
  answer_types: [
    {
      id: 1,
      value: 1,
      display: "Text",
    },
    {
      id: 2,
      value: 2,
      display: "Radio",
    },
    {
      id: 3,
      value: 3,
      display: "Checkbox",
    },
    {
      id: 4,
      value: 4,
      display: "Dropdown",
    },
    {
      id: 5,
      value: 5,
      display: "Multiselect",
    },

    {
      id: 6,
      value: 7,
      display: "DateTime",
    },
  ],
  maxLength: {
    default: 100,
  },
  icons: {
    AddQuestion: <AddIcon fontSize="small"/>,
    RemoveQuestion: <RemoveIcon/>,
  },
};
