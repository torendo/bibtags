// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
export const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      children: [
        {
          name: 'Foreman',
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
}
