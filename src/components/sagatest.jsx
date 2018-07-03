import React, {
  PureComponent,
  Component
} from 'react'
import PropTypes from 'prop-types'


class Sagatest extends PureComponent {
// class Sagatest extends Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log('sagatest render');
    const { onIncrement, onDecrement, onIncrementAsync, value } = this.props
    return (
      // react16中新增的语法，React.fragment
      // 有效减少无用标签
      <React.Fragment>
        <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
      </React.Fragment>
    )
  }
}

Sagatest.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired
}

export default Sagatest 