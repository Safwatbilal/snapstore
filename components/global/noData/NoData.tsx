import React, { useEffect } from 'react';
import './NoData.css';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Badge } from '@/components/ui/badge';

interface NoDataProps {
  title: string;
}

const NoData: React.FC<NoDataProps> = ({ title }) => {
  useEffect(() => {
    const tools = document.querySelectorAll('.tool-item') as NodeListOf<HTMLElement>;
    const container = document.querySelector('#tools-container') as HTMLElement;
    let accumulatedHeight = 0;
    const gap = 16;

    tools.forEach((tool, index, array) => {
      const totalTools = array.length;
      const randomX = Math.random() * (container.offsetWidth - tool.offsetWidth);
      const randomRotation = Math.random() * 40 - 20;
      const invertedDelay = (totalTools - index - 1) * 0.3;

      tool.style.left = `${randomX}px`;
      tool.style.top = `${accumulatedHeight}px`;
      tool.style.setProperty('--rotation', `${randomRotation}deg`);
      tool.style.animation = `fall 1s ease-in-out ${invertedDelay}s forwards`;

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      tool.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - tool.offsetLeft;
        offsetY = e.clientY - tool.offsetTop;
        tool.style.zIndex = '1000';
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          tool.style.left = `${e.clientX - offsetX}px`;
          tool.style.top = `${e.clientY - offsetY}px`;
        }
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          tool.style.zIndex = '0';
        }
      });

      accumulatedHeight += tool.offsetHeight + gap;
    });
  }, []);

  return (
    <div className="grid-item item4" id="tools-container">
    <div className="tools-grid">
      <div className="letters-row">
        {[...title].map((char, index) => (
          <Badge
            key={index}
            variant="outlined"
            className={`py-1 px-3 letter ${char === ' ' ? 'border-0 text-blue-300 bg-transparent  ' : 'border-[#1976d233]'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === ' ' ? (
              <RemoveCircleOutlineOutlinedIcon />
            ) : (
              char
            )}
          </Badge>
        ))}
      </div>
    </div>
  </div>
  );
};

export default NoData;
