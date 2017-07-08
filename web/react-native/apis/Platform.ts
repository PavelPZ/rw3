const Platform = {
  OS: 'web',
  select: (obj: any) => ('web' in obj ? obj.web : {})
};

export default Platform;
