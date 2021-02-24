import axios from 'axios';
import { notification } from 'ant-design-vue';

function request(options) {
    return axios(options)
        .then(
            res => { return res }
        ).catch(error => {
            const { response: { status, statusText } } = error;
            notification.error({
                //全局用jsx
                //eslint-disable-next-line
                message: h => (
                    <div>
                        请求错误
                        <span style="color:red">{status}</span>:
                        {options.url}
                    </div>
                ),
                description: statusText,
            });
            // 如果用promise.reject 那么组件（analysis）里不需要判断返回值是否存在
            return Promise.reject(error);
        })
}

export default request;