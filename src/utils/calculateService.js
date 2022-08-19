const BASE_URL = "/api/calculate/";

function add(formData) {
    return (
        fetch(BASE_URL + "add", {
            method: "POST",
            body: formData,
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
