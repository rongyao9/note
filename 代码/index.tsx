// CSS
import './index.sass'
// Vue API
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { defineComponent, ref, computed, unref } from 'vue'
// Hooks
import  useFilter  from '@/hooks/web/useFilter'
import  useGoods  from '@/hooks/web/useGoods'
import  useUserInfo  from '@/hooks/web/useUserInfo'
// Components
// 中文换行失败
import {Toast} from 'vant'
import GoodsList from '@/views/mobile/components/GoodsList'
import statePage from '@/views/mobile/components/statePage'
import stickeyButton from '@/views/mobile/components/stickeyButton'
import { auctionIcon } from '@/setup/images/auctionIcon'
// Config
import { shopListConfig } from '@/config/mobile/shopListConfig'
// Typings
import { ListState } from '@/typings/State'
import { SocketResponent } from '@/typings/Common'

export default defineComponent({
  name: 'shop',
  components:{GoodsList, statePage, stickeyButton},
  props: {
    status: {
      type: Number as PropType<number>,
      default: ListState['shop'],
    },
    title: {
      type: String as PropType<string>,
    },
  },
  data(){
      return {

      }
  },
  mounted(){
    this.joinSocketRoom()
  },
  methods:{
    joinSocketRoom(){
        this.$socket.emit('/room/join',{
            rooms:['list']
        })
    }
  },
  sockets:{
      'front/shop/stock'(res:SocketResponent){
        this.list.state = this.updateGoodList()
      }
  },
  setup(props) {

    const [route, router, store] = [useRoute(), useRouter(), useStore()]

    const {
        updateGoodList,
        getGoods
    } = useGoods()

    const {
        getFilter
    } = useFilter()

    const {
        userInfo,
        updateUserInfo
    } = useUserInfo()

    const getStatus = computed(() => {
      const { status: routeStatus } = query;
      const { status } = props;
      return Number(routeStatus) || status;
    });

    const getMapValue = computed(
      (): MapValue => {
        return unref(statusMapRef).get(unref(getStatus)) as MapValue;
      }
    );

    const slots = {
        auction :{
            icon:(props:iconProps)=>{
                return <img src={} alt="auctionIcon" />
            }
        }
    }

    return () => {
      const { title, subTitle, btnText, icon, handler, status } = unref(getMapValue) || {};
      return (
        <>
            <Goods {...shopListConfig}
            v-models={[
                [showFilterBox.value,'show'],
                [fukterForm,'filterForm']
                title && (
                  <Button type="primary" onClick={handler}>
                  {() => title}
                  </Button>
              ),
            ]}>
            </Goods>
        </>
      );
    };
  },
});
