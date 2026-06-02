export const queryKey = {
   release: {
      list: (repo: string) => ['list', 'releases', repo],
      latest: (repo: string) => ['latest', 'release', repo],
   },
   tag: {
      list: (repo: string) => ['list', 'tags', repo],
      latest: (repo: string) => ['latest', 'tag', repo],
   },
};
