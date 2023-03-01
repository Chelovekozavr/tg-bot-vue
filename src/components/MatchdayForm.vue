<template>
    <form @submit.prevent="onSubmit" className="form">
        <h2 class="page-title">Бронювання</h2>
        <div class="section">
            <p class="title">На коли:</p>
            <div class="input-container-radio">
                <label class="radio">
                    <input
                        type="radio"
                        value="16:00"
                        v-model="time"
                        id="16:00"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">16:00</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="17:00"
                        v-model="time"
                        id="17:00"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">17:00</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="18:00"
                        v-model="time"
                        id="18:00"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">18:00</span>
                </label>
            </div>
        </div>

        <div class="section">
            <p class="title"><label>Для кого:</label></p>
            <div class="input-container">
                <input
                    class="text-input"
                    type="text"
                    id="name"
                    v-model="name"
                >
            </div>
            <p v-if="errors.nameError.error">
                {{ errors.nameError.text}}
            </p>
        </div>

        <div class="section">
            <p class="title"><label htmlFor="guests">На скількох:</label></p>
            <div class="input-container input-with-buttons-container">
                <button
                    class="input-btn btn"
                    type="button"
                    @click="minusGuests"
                >
                    -
                </button>
                <input
                    class="text-input input-with-buttons"
                    id="guests"
                    type="number"
                    :value="guests"
                    @input="updateGuests"
                >
                <button
                    class="input-btn btn"
                    type="button"
                    @click="plusGuests"
                >
                    +
                </button>
            </div>
            <p v-if="errors.guestsError.error">
                {{ errors.guestsError.text}}
            </p>
        </div>

        <div class="section">
            <p class="title">Побажання по розміщенню:</p>
            <div class="input-container-radio">
                <label class="radio">
                    <input
                        type="radio"
                        value="bar"
                        v-model="place"
                        id="bar"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">на барі</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="far"
                        v-model="place"
                        id="far"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">дальній зал</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="round"
                        v-model="place"
                        id="round"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">круглий стіл</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="tribune"
                        v-model="place"
                        id="tribune"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">зал з трибуною</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="center"
                        v-model="place"
                        id="center"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">по центру залу</span>
                </label>

            </div>
        </div>

        <button class="btn" type="submit">Забронювати</button>
    </form>
</template>

<script>
import { ref, reactive, watch } from 'vue';


export default {
    name: "MatchdayForm",
    setup() {
        let time = ref('16:00');
        let name = ref(window?.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula');
        // let name = ref('Kaligula');
        let guests = ref(1);
        let place = ref('bar');

        let errors = reactive({
            nameError: {
                error: false,
                text: ''
            },
            guestsError: {
                error: false,
                text: ''
            }
        })

        watch(name, (currentValue) => {
            console.log(currentValue, currentValue.length)
            if(currentValue.length <= 3) {
                console.log('less')
                errors.nameError.error = true;
                errors.nameError.text = 'Не менше 3 символів';
            } else if(currentValue.length >= 15) {
                console.log('more')
                errors.nameError.error = true;
                errors.nameError.text = 'Не більше 15 символів';
            } else {
                console.log('norm')
                errors.nameError.error = false;
                errors.nameError.text = '';
            }
        })

        watch(guests, (currentValue) => {
            if(currentValue < 1) {
                errors.guestsError.error = true;
                errors.guestsError.text = 'Недопустиме значення'
            } else if(currentValue > 20) {
                errors.guestsError.error = true;
                errors.guestsError.text = 'Максимальне значення — 20'
                return;
            } else {
                errors.guestsError.error = false;
                errors.guestsError.text = ''
            }
        });

        function minusGuests() {
            if(guests.value <=1) {

                return;
            }
            guests.value--;
        }

        function plusGuests() {
            if(guests.value >= 20) {
                errors.guestsError.error = true;
                errors.guestsError.text = 'Максимальне значення — 20'
                return;
            }
            guests.value++;
        }

        function updateGuests(e) {
            guests.value = e.target.value;
        }

        function updateName(e) {
            name.value = e;
            console.log(e, 'updateVal')
        }

        function onSubmit() {
            if(errors.nameError.error || errors.guestsError.error) {
                return;
            }

            alert('good')
        }

        return {
            time,
            name,
            guests,
            place,
            errors,
            updateName,
            updateGuests,
            minusGuests,
            plusGuests,
            onSubmit
        }
    }
}
</script>

<style scoped>
input {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
}
button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
    outline: none;
}
button:active {
    transform: scale(0.9);
}
.form {
    margin-top: 80px;
    text-align: left;
}
.section {
    margin-bottom: 20px;
}
.page-title {
    margin-bottom: 20px;
}
.title {
    margin-bottom: 10px;
}
.input-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.input-with-buttons-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}
.input-with-buttons {
    text-align: center;
}
.input-with-buttons-container > input {
    width: 60px;
}
.btn {
    font-weight: 700;
    border-radius: 30px;
    color: white;
    background: #0C99E3;
    transition: .5s;
    width: auto;
    padding: 5px 10px;
}
.input-btn {
    height: 34px;
    width: 34px;
    border-radius: 50%;
    padding: 0;

}
.text-input {
    width: 100%;
    height: 30px;
    border-radius: 30px;
    padding: 0 10px;
    background: #fff;
    color: black;
}
.input-container-radio {
    display: grid;
    grid-template-columns: repeat(auto-fit, 150px);
    justify-self: center;
    align-self: center;
    gap: 20px;
}
.radio {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    user-select: none;
}
.radio-txt {
    white-space: nowrap;
}
.radio .radio-btn {
    position: relative;
    display: inline-block;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 10px;
}
.radio:hover .radio-btn {
    border-color: #666;
}
.radio input[type="radio"]:checked + .radio-btn:after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    height: 12px;
    width: 12px;
    background-color: #0C99E3;
    border-radius: 50%;
}
</style>

