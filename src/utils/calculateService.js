const BASE_URL = "/api/calculate/";

function add(numbers) {
    return (
        fetch(BASE_URL + "add", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(numbers),
        })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error("Oops, something went wrong.");
        })
    )
}

const calculateService = {
  add,
};

export default calculateService;
