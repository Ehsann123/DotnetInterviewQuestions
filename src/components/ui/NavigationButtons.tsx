import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { topics } from '../../data/topics';

interface NavigationButtonsProps {
  currentTopicId: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentTopicId }) => {
  const currentIndex = topics.findIndex(topic => topic.id === currentTopicId);
  const previousTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
      {previousTopic ? (
        <Link to={previousTopic.route}>
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-sm text-gray-500">Previous</div>
              <div className="font-semibold text-gray-900">{previousTopic.title}</div>
            </div>
          </motion.button>
        </Link>
      ) : (
        <div />
      )}

      {nextTopic && (
        <Link to={nextTopic.route}>
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="text-right">
              <div className="text-sm text-blue-100">Next Topic</div>
              <div className="font-semibold">{nextTopic.title}</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default NavigationButtons;