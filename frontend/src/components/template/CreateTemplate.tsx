import { createSwapy } from 'swapy'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import TemplateGrid from './TemplateGrid'


function CreateTemplate() {
  const swapy = useRef(null)
  const container = useRef(null)
  const location = useLocation()

  const { filteredNewslettersData } = location.state || {};
  console.log(filteredNewslettersData);

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log('swap', event);
      })
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, [])

  return (
    <div ref={container}>

      <div data-swapy-slot="a">
        <div data-swapy-item="a">
          <div>A</div>
        </div>
      </div>

      <div data-swapy-slot="b">
        <div data-swapy-item="b">
          <div>B</div>
        </div>
      </div>
    <div>
    <TemplateGrid TemplateNewsletters={filteredNewslettersData}/>
    </div>
    </div>
  )
}

export default CreateTemplate;