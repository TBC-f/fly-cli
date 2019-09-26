const axios = require('axios');
// 1) 获取项目列表
const fetchRepoList = async () => {
    const { data } = await axios.get('https://api.github.com/orgs/TBC-F/repos');
    return data;
};
// 抓取tag列表
const fechTagList = async (repo) => {
    const { data } = await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`);
    return data;
  };
let create = async function (projectName) {
    console.log(projectName)
    let list = await fetchRepoList();
    console.log(list)
};

module.exports = create;