import './App.css'
import ClickCounter from './components/ClickCounter'
import DoubleClick from './components/DoubleClick'
import HoverBox from './components/HoverBox'
import InputField from './components/InputField'
import KeyTracker from './components/KeyTracker'
import SubmissionAlert from './components/SubmissionAlert'
import ToggleButton from './components/ToggleButton'
import FruitSelector from './components/FruitSelector'
import CheckboxToggle from './components/CheckboxToggle/index'
import SearchFilter from './components/SearchFilter'

function App() {

  return (
    <>
    <main className='container'>
      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 1: Button Click Counter</h3>
        </div>
        <div className='section-title'>
          <ClickCounter/>
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 2: Input Field Tracker</h3>
        </div>
        <div className='section-title'>
          <InputField />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 3: Toggle Switch</h3>
        </div>
        <div className='section-title'>
        <ToggleButton  />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 4: Hover Highlight</h3>
        </div>
        <div className='section-title'>
          <HoverBox />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 5: Form Submission Alert</h3>
        </div>  
        <div className='section-title'>
          <SubmissionAlert />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 6: Key Press Display</h3>
        </div>
        <div className='section-title'>
          <KeyTracker />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 7: Double Click Message</h3>
        </div>
        <div className='section-title'>
          <DoubleClick />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 8: Fruit Selector</h3>
        </div>
        <div className='section-title'>
          <FruitSelector />
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 9: Checkbox Toggle</h3>
        </div>
        <div className='section-title'>
          <CheckboxToggle /> 
        </div>
      </section>

      <section className='section'>
        <div className='section-header'>
          <h3>Exercise 10: Search Filter</h3>
        </div>
        <div className='section-title'>
          <SearchFilter />
        </div>
      </section>
    </main>
    </>
  )
}

export default App
