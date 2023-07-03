import { defineStore } from 'pinia'
import { ref } from 'vue'

// pinia的返回函数的命名规范是使用use + 目标名称 + store的形式来为存储指定ID
export const useUserStore =
    defineStore('currentUser', () => {
            // 使用setup式语法
            // 默认isDeleted为1用于辨别角色 如果更新信息进入则isDeleted置0
            // 我不知道为什么用reactive之后c, 这个位置就不是响应式的了 用ref可以 但是代码联想会丢失
            const currentUser = ref( {
                id: 1,
                loginAccountId: 1,
                departmentId: 1,
                bedId: "",
                name: "",
                personalId: "",
                personalCardUrl: "",
                faceId: "",
                faceUrl: "",
                alipayId: "",
                email: "",
                sex: 1,
                isCadre: 0,
                status: 0,
                payType: 0,
                networkEnabled: 0,
                isDeleted: 1
        })

            function reset () {
                currentUser.value = {
                    id: 1,
                    loginAccountId: 1,
                    departmentId: 1,
                    bedId: "",
                    name: "",
                    personalId: "",
                    personalCardUrl: "",
                    faceId: "",
                    faceUrl: "",
                    alipayId: "",
                    email: "",
                    sex: 1,
                    isCadre: 0,
                    status: 0,
                    payType: 0,
                    networkEnabled: 0,
                    isDeleted: 1
                }
            }

            return {currentUser, reset}
        }, {
            persist: {
                storage: sessionStorage,
                paths: ['currentUser'],
                key: "currentUser"
            }
        }
    )

export const useNavStore =
    defineStore('nav', () => {
            const nav = ref({
                currentNav: 'main',
                to: '/main/my/my-home'
            })

            function reset () {
                nav.value = {
                    currentNav: 'main',
                    to: '/main/my/my-home'
                }
            }
            return {nav, reset}
        },{
            // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html
            // https://blog.csdn.net/qq_42859450/article/details/125841641
            persist: {
                storage: sessionStorage,
                paths: ['nav'],
                key: "nav"
            }
        }
    )
