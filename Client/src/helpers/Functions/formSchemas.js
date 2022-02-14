export const newOrganizationProjectSchema = [
  {
    name: "name",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "description",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "framework",
    type: "select",
    value: "",
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
            value: "",
          },
        ],
      },
    },
  ];
};

export const newComponentSchema = [
  {
    name: "Path",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Category",
    type: "text",
    value: "",
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
];

export const editableComponentMetaDataSchema = (currentComponentMetaData) => {
  return [
    {
      name: "Path",
      type: "text",
      value: currentComponentMetaData.path,
      required: true,
    },
    {
      name: "Category",
      type: "text",
      value: currentComponentMetaData.category,
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
  ];
};

export const componentPillSchema = [
  {
    name: "Name",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "pill_type",
    type: "select",
    value: "",
    required: true,
    settings: {
      options: [
        {
          label: "Primary",
          value: "primary",
        },
        {
          label: "Secondary",
          value: "secondary",
        },
        {
          label: "Success",
          value: "success",
        },
        {
          label: "Danger",
          value: "danger",
        },
        {
          label: "Warning",
          value: "warning",
        },
        {
          label: "Info",
          value: "info",
        },
        {
          label: "Light",
          value: "light",
        },
        {
          label: "Dark",
          value: "dark",
        },
      ],
    },
  },
  {
    name: "Description",
    type: "text",
    value: "",
  },
];

export const deleteComponentPillSchema = (pills) => {
  return [
    {
      name: "pill",
      type: "select",
      value: "0",
      settings: {
        options: pills.map((tag, idx) => {
          return {
            value: idx,
            label: tag.name,
          };
        }),
      },
      required: true,
    },
  ];
};

export const newComponentFileSchema = [
  {
    name: "Name",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Path",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Data_Type",
    type: "text",
    value: "",
  },
  {
    name: "Description",
    type: "text",
    value: "",
  },
  {
    name: "notes",
    type: "textarea",
    value: "",
  },
];

export const editableComponentFileSchema = (file) => {
  return [
    {
      name: "Name",
      value: file.name?.length > 0 ? file.name : "",
      type: "text",
      required: true,
    },
    {
      name: "Path",
      value: file.path?.length > 0 ? file.path : "",
      type: "breadcrumbs",
      required: true,
    },
    {
      name: "data_type",
      value: file.data_type?.length > 0 ? file.data_type : "",
      type: "text",
    },
    {
      name: "description",
      value: file.description?.length > 0 ? file.description : "",
      type: "text",
    },
    {
      name: "notes",
      value: file.notes?.length > 0 ? file.notes : "",
      type: "textarea",
    },
  ];
};

export const newComponentFunctionSchema = [
  {
    name: "Name",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Parameters",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Returns",
    type: "text",
    value: "",
    required: true,
  },
  {
    name: "Path",
    type: "text",
    value: "",
  },
  {
    name: "Description",
    type: "text",
    value: "",
  },
  {
    name: "LifeCycle",
    type: "text",
    value: "",
  },
  {
    name: "Notes",
    type: "text",
    value: "",
  },
];

export const editableComponentFunctionSchema = (functionData) => {
  return [
    {
      name: "Name",
      value: functionData.name?.length > 0 ? functionData.name : "",
      type: "text",
      required: true,
    },
    {
      name: "Parameters",
      value: functionData.parameters?.length > 0 ? functionData.parameters : "",
      type: "text",
      required: true,
    },
    {
      name: "Returns",
      value: functionData.returns?.length > 0 ? functionData.returns : "",
      type: "text",
      required: true,
    },
    {
      name: "Path",
      value: functionData.path?.length > 0 ? functionData.path : "",
      type: "breadcrumbs",
    },
    {
      name: "Description",
      value:
        functionData.description?.length > 0 ? functionData.description : "",
      type: "text",
    },
    {
      name: "LifeCycle",
      value: functionData.lifeCycle?.length > 0 ? functionData.lifeCycle : "",
      type: "text",
    },
    {
      name: "Notes",
      value: functionData.notes?.length > 0 ? functionData.notes : "",
      type: "text",
    },
  ];
};

export const editableOrganizationSchema = (organization) => {
  return [
    {
      name: "Name",
      value: organization.name?.length > 0 ? organization.name : "",
      type: "text",
      required: true,
    },
  ];
};
