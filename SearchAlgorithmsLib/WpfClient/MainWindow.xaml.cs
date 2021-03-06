﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfClient
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        /// <summary>
        /// Ctor
        /// </summary>
        public MainWindow()
        {
            InitializeComponent();
            this.WindowStartupLocation = WindowStartupLocation.CenterScreen;
        }
        /// <summary>
        /// event for clicking on the single player game button
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void SingleButtonClick(object sender, RoutedEventArgs e)
        {
            SinglePlayer singlePlayer = new SinglePlayer();
            this.Visibility = Visibility.Hidden;
            singlePlayer.Owner = this;
            singlePlayer.WindowStartupLocation = WindowStartupLocation.CenterOwner;
            singlePlayer.ShowDialog();
            
        }
        /// <summary>
        /// event for clicking on the multi player game button
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MultiButtonClick(object sender, RoutedEventArgs e)
        {
            MultiPlayer multiPlayer = new MultiPlayer();
            this.Visibility = Visibility.Hidden;
            multiPlayer.Owner = this;
            multiPlayer.WindowStartupLocation = WindowStartupLocation.CenterOwner;
            multiPlayer.ShowDialog();
            
        }
        /// <summary>
        /// event for clicking on the settings button
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void SettingsButtonClick(object sender, RoutedEventArgs e)
        {
            Settings settings = new Settings();
            this.Visibility = Visibility.Hidden;
            settings.Owner = this;
            settings.WindowStartupLocation = WindowStartupLocation.CenterOwner;
            settings.ShowDialog();
            
        }
    }
}
