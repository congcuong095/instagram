function Ask({ props }) {
    side(props);
}

function side(props) {
    console.log(props);
    return props;
}

export default Ask;
export { side };
