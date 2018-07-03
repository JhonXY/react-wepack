import { connect } from 'react-redux'
import Sagatest from '@/components/sagatest'

// state 为redux中的state，props为即将传入的 props
const mapStateToProps = (state, props) => {
  return { value: state.num }
}

// const mapDispatchToProps = state

export default connect(
  mapStateToProps, 
  // mapDispatchToProps 
)(Sagatest)