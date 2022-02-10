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
    value: [{ name: "", pill_type: "", description: "" }],
    settings: {
      inputs: [
        {
          name: "Name",
          type: "text",
          value: "",
        },
        {
          name: "pill_type",
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
          name: "pill_type",
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
    value: [{ name: "", pill_type: "", description: "" }],
    settings: {
      inputs: [
        {
          name: "Name",
          type: "text",
          value: "",
        },
        {
          name: "pill_type",
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
];

export const editableProjectSchema = (currentProject) => {
  return [
    {
      name: "name",
      type: "text",
      value: currentProject.name,
      required: true,
    },
    {
      name: "description",
      type: "text",
      value: currentProject.description,
      required: true,
    },
    {
      name: "framework",
      type: "select",
      value: currentProject.framework,
      required: true,
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

export const editableComponentMetaDataSchema = (currentComponentMetaData) => {
  return [
    {
      name: "Category",
      type: "text",
      value: currentComponentMetaData.category,
    },
    {
      name: "Path",
      type: "text",
      value: currentComponentMetaData.path,
      required: true,
    },
    {
      name: "Example",
      type: "text",
      value: currentComponentMetaData.example,
    },
    {
      name: "Description",
      type: "text",
      value: currentComponentMetaData.description,
    },
    {
      name: "Props",
      type: "array-list",
      value: currentComponentMetaData.props,
      settings: {
        currentValue: currentComponentMetaData.props.map((prop) => {
          return [
            {
              name: "Name",
              type: "text",
              value: prop.name,
            },
            {
              name: "Type",
              type: "text",
              value: prop.type,
            },
            {
              name: "Description",
              type: "text",
              value: prop.description,
            },
          ];
        }),
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
};
