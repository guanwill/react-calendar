class Label extends React.Component {
  render () {
    return (
      <div>
        <div>{this.props.label}</div>
      </div>
    );
  }
}

Label.propTypes = {
  label: React.PropTypes.string //react expects the prop to be string type only. if you specify wrong type, console will spit out an useful error
};
