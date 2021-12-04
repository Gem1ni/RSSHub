const got = require('@/utils/got');
const dayjs = require('dayjs');
const { art } = require('@/utils/render');
const path = require('path');
const console = require('console');

const host = "https://pcw-api.iqiyi.com";

module.exports = async (ctx) => {
    const now = dayjs().valueOf();

    const url = `${host}/search/recommend/list?channel_id=2&data_type=1&mode=4&page_id=1&ret_num=48` //&three_category_id=15;must
    
    const items = await Promise.resolve(
        ctx.cache.tryGet(url,
            async () => {
                const response = await got.get(`${url}`, {
                    headers: { origin: `https://list.iqiyi.com/`, },
                });
                const data = response.data.data;
                return data.list.map((item) => {
                    return {
                        title: item.name,
                        description: item.description,
                        pubDate: item.period,
                        link: item.playUrl
                    }
                });
            })
    );

    ctx.state.data = {
        title: `爱奇艺 - 电视剧 - 新上线`,
        link: host,
        description: now,
        item: items
    };
};