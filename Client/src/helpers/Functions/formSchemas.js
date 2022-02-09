export const newComponentSchema = [
  {
    name: "Category",
    type: "text",
    value: "",
  },
  {
    name: "Path",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Example",
    type: "text",
    value: "",
  },
  {
    name: "Description",
    type: "text",
    value: "",
  },
  {
    name: "Props",
    type: "array-list",
    value: [{ name: "", type: "", description: "" }],
    settings: {
      inputs: [
        {
          name: "Name",
          type: "text",
          value: "",
        },
        {
          name: "Type",
          type: "text",
          value: "",
        },
        {
          name: "Description",
          type: "text",
          value: "",
        },
      ],
    },
  },
  {
    name: "State",
    value: [
      {
        name: "",
        type: "",
        description: "",
      },
    ],
    type: "array-list",
    settings: {
      inputs: [
        {
          name: "Name",
          type: "text",
          value: "",
        },
        {
          name: "Type",
          type: "text",
          value: "",
        },
        {
          name: "Description",
          type: "text",
          value: "",
        },
      ],
    },
  },
  {
    name: "Tags",
    type: "array-list",
    value: [{ name: "", type: "" }],
    settings: {
      inputs: [
        {
          name: "Name",
          type: "text",
          value: "",
        },
        {
          name: "Type",
          type: "text",
          value: "",
        },
      ],
    },
  },
];

export const editableProjectSchema = (currentProject) => {
  console.log("currentProject", currentProject);
  return [
    {
      name: "name",
      type: "text",
      value: currentProject.name,
    },
    {
      name: "description",
      type: "text",
      value: currentProject.description,
    },
    {
      name: "framework",
      type: "select",
      value: currentProject.framework,
      settings: {
        options: [
          {
            label: "Svelte",
            value: "svelte",
          },
          {
            label: "React",
            value: "react",
          },
          {
            label: "Vue",
            value: "vue",
          },
          {
            label: "Angular",
            value: "angular",
          },
          {
            label: "Ember",
            value: "ember",
          },
          {
            label: "Other",
            value: "other",
          },
        ],
      },
    },
  ];
};
